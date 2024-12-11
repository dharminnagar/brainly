import { Brain, Twitter, Youtube, FileText, Link2, Hash } from "lucide-react";
import { ReactElement } from "react";

export function SideBar() {
  return (
    <div className="border-r flex flex-col w-72 h-screen position-fixed left-0 top-0">
      <div className="flex items-center px-5 py-5 mb-5">
        <div className="icon pr-3 text-purple-500">
          {" "}
          <Brain size={32} />{" "}
        </div>
        <div className="text text-2xl font-bold">Second Brain</div>
      </div>

      <SideBarListComponent title={"Tweets"} icon={<Twitter />} />
      <SideBarListComponent title={"Videos"} icon={<Youtube />} />
      <SideBarListComponent title={"Document"} icon={<FileText />} />
      <SideBarListComponent title={"Link"} icon={<Link2 />} />
      <SideBarListComponent title={"Tags"} icon={<Hash />} />
    </div>
  );
}

interface SideBarListComponentProps {
  title: string;
  icon: ReactElement;
}

export function SideBarListComponent({
  title,
  icon,
}: SideBarListComponentProps) {
  return (
    <div className="">
      <div className="flex my-1 p-3 mx-8 rounded-md text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
        <div className="mr-5">{icon}</div>
        <div>{title}</div>
      </div>
    </div>
  );
}
