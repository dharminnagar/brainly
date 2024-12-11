import "dotenv/config";
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { contentModel, userModel, linkModel, tagModel } from "./db";
import bcrypt from "bcrypt";
import cors from "cors";
import { z } from "zod";
import { JWT_USER_PASSWORD } from "./config";
import { userMiddleware } from "./middlewares";

const saltRounds = 10;

if (!JWT_USER_PASSWORD) {
  throw new Error("JWT_USER_PASSWORD is not defined");
}

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.post("/api/v1/signup", async (req, res) => {
  // TODO: zod validation
  // TODO: Add Status codes

  const schema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username should be between 3-10 lettters")
      .max(10, "Username should be between 3-10 lettters"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    res.status(411).json({
      message: "Error in Inputs",
      errors: validation.error.errors,
    });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const encryptedPass = await bcrypt.hash(password, saltRounds);

  try {
    await userModel.create({
      username: username,
      password: encryptedPass,
    });

    res.status(200).json({
      message: "Signup Sucessful",
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
      error: e,
    });
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exist",
    });
  } else {
    const result = user.password
      ? await bcrypt.compare(password, user.password)
      : false;
    if (result) {
      const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);

      res.json({
        message: "Login Successful",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect Credentials",
      });
    }
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;

  try {
    await contentModel.create({
      title: title,
      link: link,
      type: type,
      userId: req.userId,
    });

    res.json({
      message: "Content added",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error adding Content",
      error: e,
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const content = await contentModel
      .find({
        userId: userId,
      })
      .populate("userId", "username");

    res.json({
      message: "Content fetched Successfully",
      content: content,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in Fetching Contents",
    });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  try {
    await contentModel.deleteOne({
      contentId,
      userId: req.userId,
    });

    res.json({
      message: "Content Deleted Successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in Deleting Content",
      error: e,
    });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    try {
      const existingLink = await linkModel.findOne(req.userId);

      if (existingLink) {
        res.json({
          message: "Link already exists",
          link: existingLink.hash,
        });
        return;
      }
    } catch (e) {
      res.status(500).json({
        message: "Error in fetching link",
        error: e,
      });
    }

    const shareLink = jwt.sign({ id: req.userId }, JWT_USER_PASSWORD);

    try {
      await linkModel.create({
        hash: shareLink,
        userId: req.userId,
      });

      res.json({
        message: "Link Generated Successfully",
        link: shareLink,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error in updating link",
        error: e,
      });
    }
  } else {
    try {
      await linkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        message: "Link Removed Successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "Error in updating link",
        error: e,
      });
    }
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const shareLink = req.params.shareLink;

  const decoded = jwt.verify(shareLink, JWT_USER_PASSWORD) as JwtPayload;

  if (decoded) {
    try {
      const content = await contentModel.find({
        userId: decoded.id,
      });
      res.json({
        message: "Success",
        content: content,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error in Fetching Content",
        error: e,
      });
    }
  } else {
    res.status(404).json({
      message: "Invalid Share Link",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
