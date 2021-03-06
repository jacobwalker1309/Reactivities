import { observer } from 'mobx-react-lite';
import React from 'react';
import {Tab} from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowing';
import ProfileActivites from './ProfileActivities';
import { useStore } from '../../app/stores/store';
interface Props {
    profile:Profile
}

export default observer(function ProfileContent({profile}:Props){

    const {profileStore} = useStore();


    const panes = [
        {menuItem:'About',render:()=> <Tab.Pane>About Content</Tab.Pane>},
        {menuItem:'Photos',render:()=> <ProfilePhotos profile={profile}/>},
        {menuItem:'Events',render:()=> <ProfileActivites />},
        {menuItem:'Followers',render:()=> <ProfileFollowings />},
        {menuItem:'Following',render:()=> <ProfileFollowings />},
        
    ];

    return (
        <Tab
        menu={{fluid:true,vertical:true}}
        menuPosition='right'
        panes={panes}
        onTabChange={(e,data)=> profileStore.setActiveTab(data.activeIndex)}
        />
    )
})