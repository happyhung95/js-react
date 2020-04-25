import { combineReducers} from 'redux';

const songsReducer = () => {
    return [
        {title: 'Perfect', duration: '4:05'},
        {title: 'Put It All On Me', duration: '3:05'},
        {title: 'Beautiful People', duration: '3:45'},
        {title: 'South of the Border', duration: '4:45'},
    ];
};

const selectedSongReducer = (selectedSong=null, action) => {
    if (action.type === 'SONG_SELECTED') {
        return action.payload;
    }

    return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});
