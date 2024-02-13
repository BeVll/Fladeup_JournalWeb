export const InformationItem = ({title, text}:{title:string, text:string|undefined}) => {
    return (
        <div className={"justify-between flex"}>
            <span className="text-default-500">{title}</span>
            <span className="font-medium">{text}</span>
        </div>
    );
};
