//imports
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion'; 
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedSlider from './SpeedSlider';
import Leaderboard from './Leaderboard'
import axios from "axios";
import { gameListener } from './StartMenu';




const SongSelect = ({setHidden, setSongSelected, setSongName, songName, hidden}) => {

    const [songs, setSong] = useState([]);
    //const [currentSongmap, setCurrentSongmap] = useState([]);
    useEffect(() => {
        getSongs();
    }, []);

    //using axios is an easier way to access the db that bypasses needed an api slice file found in the features folder
    const getSongs = async () => {
        const response = await axios.get("http://localhost:3500/songs");
        setSong(response.data);
    };

    //states 
    const {playMusic, restartMusic} = useMusicPlayer();

    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event , newExpanded) => {
        console.log("newExpanded: " + newExpanded)
        setExpanded(newExpanded ? panel : false);
        };

    function handlePlayMusic(songmap){
        //setCurrentSongmap(songmap);
        song_values.updateSong(songmap);
        playMusic(songmap);

    }

    //restarts song when play button is pressed on start menu
    gameListener.musicstarter = (songmap) => {
        restartMusic(songmap); //function from usemusicplayer hook
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
                            <Box>
                                <Typography>bpm: {songmap.bpm}</Typography>
                            </Box>
                            <Box>
                                <Typography>length: {songmap.length}</Typography>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                ))}

            </AccordionDetails>
            <SpeedSlider/>

        </Accordion>
        

    </div>
);}
export default SongSelect;
function seededPRNG(bpm, length){
    const arraySize = Math.round(bpm * length / 60); // the array size is calculated from the speed and length of the song
    console.log("arraySize: " + arraySize)
    var seedArr = [];

    for (var i = 0; i < arraySize; i++) {
        //let random = Math.random() * (60 - 0) + 0;
        let random = Math.floor(Math.random() * (127 - 33 + 1)) + 33;
        seedArr.push(random);
        }   
    return seedArr;
}
export function randomizedCharacters(bpm, length){
    
    
    const seedArr = seededPRNG(bpm, length)
    const charArray = [];
    console.log("seedArr legnth: " +  seedArr.length);
    for (let i = 0; i < seedArr.length; i++) {
      const char = String.fromCharCode(seedArr[i]);
      console.log(i + ": " + seedArr[i]);
      charArray.push(char);

    }
    return charArray;
}

export const song_values = {
    current_song_char: randomizedCharacters(145, 139),
    updateSong: (songmap) => {
        song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
        //console.log("current song char length: " + song_values.current_song_char.length);
    }
}
    
    //const [visible, setVisible] = useState(false);
    /*const [isPlaying, setIsPlaying] = useState(false);*/

    /*function handlePlayMusic(songmap){

        //setCurrentSongmap(songmap);
        playMusic(songmap);*/
    
      
  
/*return (
    <div className="song-select">
        <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Song Select</Typography>
            </AccordionSummary>
            <AccordionDetails>

                    <Tabs
                        orientation="vertical"
                        >
                        {songsList.map((songmap, index) => (
                            <div className="box">
                                <button className="button" onClick={() => handlePlayMusic(songmap)}>
                                    {currentSongmap.title === songmap.title && isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                                </button>
                                <div className="song-title">
                                    {songmap.title}
                                </div>
                            </div>
                        ))}
                        
                    </Tabs>
                             
                    <div>
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
                        </div>*/