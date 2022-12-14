//imports
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion'; 
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { default as SpeedSlider, scroll_values } from './SpeedSlider';
import Leaderboard from './Leaderboard'
import axios from "axios";
import { StartMenu,  gameListener } from './StartMenu';




const SongSelect = ({setHidden, songSelected, setSongSelected, setSongName, songName, hidden}) => {

    //setting the song states
    const [songs, setSong] = useState([]);
    
    useEffect(() => {
        getSongs();
    }, []);

    //using axios is an easier way to access the db that bypasses needed an api slice file found in the features folder
    const getSongs = async () => {
        //getting songs from database
        const response = await axios.get("http://localhost:3500/songs");
        setSong(response.data);
    };

    //importing functions from useMusicPlayer
    const {playMusic, restartMusic} = useMusicPlayer();

    const [expanded, setExpanded] = useState(false);

    //selecting one song should collapse the accordion for the previously selected song.
    //it is called when the song is selected 
    const handleChange =
        (panel) => (event , newExpanded) => {
        console.log("newExpanded: " + newExpanded)
        setExpanded(newExpanded ? panel : false);
        };

    //playing the selected song and updating song_valyes, the chars array
    function handlePlayMusic(songmap){
        //setCurrentSongmap(songmap);
        song_values.updateSong(songmap);
        playMusic(songmap);

    }

    //restarts song when play button is pressed on start menu
    gameListener.musicstarter = (songmap) => {
        restartMusic(songmap); //function from usemusicplayer hook
    }

    scroll_values.resetMenu = () => {
        setHidden(false);
    }

    scroll_values.setGenerationTime = (songmap) => {
        scroll_values.generation_time = 1000 / Math.floor(1000/(songmap.bpm*4));
    }
    
    //sets states for start menu
    function selectSong(songmap) {
        setHidden(false); //brings back start menu if song selected during gameplay
        setSongSelected(true); //sets song selected to true for startmenu button to be enabled
        setSongName(songmap.title); //returns song title for start menu
    }

    

return (
    <div className="song-select">
        <Accordion defaultExpanded={false}>
            <AccordionSummary key="sum1"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Song Select</Typography>
            </AccordionSummary>
            <AccordionDetails key="det1">

                {songs?.map((songmap, index) => (
                    <Accordion expanded={expanded === songmap.title} onChange={handleChange(songmap.title)} key={"acc" + index}>
                    <AccordionSummary key="sum2"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <button className="button" onClick={() => {handlePlayMusic(songmap); selectSong(songmap);}}>
                        {songmap.title}
                    </button>
                    </AccordionSummary>
                    <AccordionDetails key="det2">
                        <Leaderboard songmap = {songmap} />
                        <Box>
                            <Box>
                                <Box>
                                    <Typography>Artist: {songmap.artist}</Typography>
                                </Box>
                                <Box>
                                    <Typography>bpm: {songmap.bpm}</Typography>
                                </Box>
                                <Box>
                                    <Typography>length: {songmap.length}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                ))}

            </AccordionDetails>
            <SpeedSlider onChangeCommitted={() => {scroll_values.setGenerationTime(songSelected)}}/>

        </Accordion>
        

    </div>
);}
export default SongSelect;

//generating a randomized array ascii code for the selected song based on the song length and bpm
function seededPRNG(bpm, length){
    
    //initializing the array being returned by this function
    const arraySize = Math.round(bpm * (length/60) / 4); // the array size is calculated from the speed and length of the song
    console.log("arraySize: " + arraySize)
    var seedArr = [];

    for (var i = 0; i < arraySize; i++) {
        //adding random int between 33 and 127 (ascii codes) to the seedArr
        let random = Math.floor(Math.random() * (127 - 33 + 1)) + 33;
        seedArr.push(random);
        }   
    return seedArr;
}

//assigning the randomized ascii codes retured by seedArr chracters.
export function randomizedCharacters(bpm, length){
    const seedArr = seededPRNG(bpm, length)
    const charArray = [];
    console.log("seedArr legnth: " +  seedArr.length);
    for (let i = 0; i < seedArr.length; i++) {
      const char = String.fromCharCode(seedArr[i]);
      charArray.push(char);

    }
    return charArray;
}


//exproting song_values containing the array returned by randomizedCharacters function 
//and updating it based of the currently selected song
export const song_values = {
    current_song_char: randomizedCharacters(145, 139),
    updateSong: (songmap) => {
        song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
    }
}