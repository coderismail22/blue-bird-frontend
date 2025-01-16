
type IHead ={
    name: string
}
const HeaderSection = ({name}:IHead) => {
    return (
        <div className="flex flex-col items-center justify-center font-robotoCondensed "> 
        <h1 className="text-3xl font-bold">{name}</h1> 
        <div className="w-16 border-t-4 border-yellow-500 mt-2"></div> 
        </div>
    );
};

export default HeaderSection;