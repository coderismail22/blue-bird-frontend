import Lottie from "lottie-react";
import notFound from "../../notFound.json"
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
       <>
        <div className="flex justify-center items-center min-h-screen">
            <Lottie 
            className="w-[80%]"
            animationData={notFound} 
            loop={true} />
            
        </div>
        <NavLink className="flex justify-center item-center" to="/"><Button variant={"destructive"}>Please Go Home</Button></NavLink>
       </>
    );
};

export default NotFoundPage;