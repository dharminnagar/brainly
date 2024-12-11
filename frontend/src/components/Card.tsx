import { ReactElement } from "react";
import {
  FileText,
  Link2,
  Share2,
  Trash2,
  Twitter,
  Youtube,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface TypeIcons {
  [key: string]: ReactElement;
}

const typeIcons: TypeIcons = {
  image: <FileText size={20} />,
  video: <Youtube size={20} />,
  document: <FileText size={20} />,
  link: <Link2 size={20} />,
  tweet: <Twitter size={20} />,
};

interface CardProps {
  title: string;
  link: string;
  type: "tweet" | "video" | "link";
}

export const Card = (props: CardProps) => {
  // Master Card Component
  return (
    <div>
      <div className="bg-slate-50 rounded-lg shadow-md border border-slate-200 p-5 min-w-96 min-h-48">
        <CardHeader props={props} />
        <CardBody props={props} />
      </div>
    </div>
  );
};

const CardHeader = ({ props }: { props: CardProps }) => {
  // async function deleteContent() {
  //   try {
  //     // Fetch the content ID from the backend
  //     const contendId = await axios.get(`${BACKEND_URL}/content`, {
  //       title: props.title,
  //       link: props.link,
  //       type: props.type,
  //     });

  //     const res = await axios.delete(`${BACKEND_URL}/content`, {});
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   console.log("Delete content");
  // }
  // Card Header Component
  return (
    <div className="flex justify-between">
      <div className="left flex items-center">
        <div className="text-gray-500 pr-3">{typeIcons[props.type]}</div>
        {props.title}
      </div>
      <div className="right flex items-center text-gray-400">
        <div className="pr-3">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <Share2 size={20} />
          </a>
        </div>
        {/* This should delete the content card */}
        <div
          onClick={() => {}}
          className="cursor-pointer hover:text-red-600 transition-all"
        >
          <Trash2 size={20} />
        </div>
      </div>
    </div>
  );
};

const CardBody = ({ props }: { props: CardProps }) => {
  // Card Body Component
  return (
    <div className="pt-4">
      {props.type === "video" && (
        <iframe
          className="w-full h-48 rounded-lg"
          src={props.link.replace("watch?v=", "embed/")}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {props.type === "tweet" && (
        <blockquote className="twitter-tweet">
          <a href={props.link.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}

      {props.type === "link" && (
        <div>
          <iframe src={props.link} className="w-full rounded-lg">
            your browser doesn't support iframe
          </iframe>
        </div>
      )}
    </div>
  );
};
