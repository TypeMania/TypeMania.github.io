//file imports
import CenterLayer from "../CenterLayer";
import PubNav from './PubNav'
import Footer from "../Footer";

import { MusicPlayerProvider } from "../../MusicPlayerContext";


//home component
const Home = () => {


    return ( 
        <MusicPlayerProvider>
            
            <div className="home">
                <PubNav/>
                <CenterLayer/>
                <Footer/>
            </div>

        </MusicPlayerProvider> 
    );
}

export default Home;
