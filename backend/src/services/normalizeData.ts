
interface SearchItem {
    id: string;
    name: string;
    imageUrl: string | null;  
}

interface Track extends SearchItem {
    albumType: string | null,
    duration: number,
}





export const normalizeSearchData = async (provider:string, searchData: any): Promise<SearchItem[]> => {
    if (provider === 'spotify'){
        const metadata = searchData.tracks;
        const tracks = metadata.items;
        return tracks.map((track:any) => ({
            id: track.id,
            title: track.name,
            artistInfo: track.artists.map((artist:any) => { 
                return {
                name: artist.name,
                profileUrl: artist.external_urls.spotify, 
                id: artist.id,
                }
            }),
            imageUrl: track.album.images[0].url,
            trackUrl: track.external_urls.spotify,
            albumType: track.album.album_type,
            duration: track.duration_ms
        })
    )} else { // provider is soundcloud
        const tracks = searchData;
        return tracks.map((track:any) => ({
            id: track.id,
            title: track.title,
            artistInfo: [{
                name: track.user.username,
                id: track.user.id,
                profileUrl: track.user.permalink_url
            }],
            imageUrl: track.artwork_url || track.user.avatar_url,
            trackUrl: track.permalink_url,
            albumType: null,
            duration: track.duration
        }))
    }
}