import React from 'react';
import externalLink from '../../assets/external-link.svg'
import FullSpotifyLogoGreen from '../../assets/spotify/Full-Logo-Green.svg'
import FullSoundcloudLogo from '../../assets/soundcloud/Full-Logo.svg'
import { Track } from '../../contexts/musicPlayerContext';
import AddToQueueAction from '../track-actions/AddToQueue';
import FavoriteAction from '../track-actions/Favorite';

interface ItemCardProps {
    item: any,
    provider: string,
}

const ItemCard: React.FC<ItemCardProps> = ({item, provider}): JSX.Element => {
    const track:Track = {
        id: item.id,
        title: item.title,
        artists: item.artistInfo,
        imageUrl: item.imageUrl,
        provider: provider,
        uri: item.uri || item.trackUrl, 
        duration: item.duration,
        isFavorited: item.isFavorited,
    };

    return (
    <div className="flex text-sm justify-between bg-primary text-white p-2 hover:bg-gray-800">
        {/* left side */}
        <div className='flex items-center gap-4'>
            <div>
                <img src={item.imageUrl} className="w-12 h-12 object-cover rounded-sm"/>
            </div>
            <div className="flex flex-col items-start">
                <p className='max-w-[140px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-[350px] truncate whitespace-nowrap overflow-hidden'>{item.title}</p>
                <div className="flex flex-wrap text-xs">
                {item.artistInfo.map((artist:any) => (
                    <a key={artist.name} href={artist.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-block whitespace-nowrap hover:underline hover:text-accent opacity-75">{artist.name}</a> 
                )).reduce((prev:any, curr:any, index:number) => [prev, <span key={`comma-${index}`} className='opacity-75'>, </span>, curr])}
                </div>
            </div>
        </div>
        {/* Right Side */}
        <div className='flex flex-col justify-between items-end'>
            <div className='flex'>
                {/* Attribution and External Link */}
                <div className='flex gap-2'>
                    <img src={provider==='spotify' ? (FullSpotifyLogoGreen) : (FullSoundcloudLogo)} className={`object-contain ${provider === 'spotify' ? 'w-16' : 'w-24'}`}></img>
                    <a href={item.trackUrl} target="_blank" rel="noopener noreferrer">
                        <img src={externalLink} className='w-4 h-4 object-cover hover:opacity-75'/>
                    </a>
                </div>
            </div>
            {/* Track Actions */}
            <div className='flex items-center gap-4'>
                <FavoriteAction trackId={track.id} provider={track.provider} isFavorited={track.isFavorited}/>
                <AddToQueueAction track={track}/>
            </div>
        </div>
    </div>)
}

export default ItemCard