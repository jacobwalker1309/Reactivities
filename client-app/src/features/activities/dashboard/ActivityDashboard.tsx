import React, { useEffect } from 'react';
import {Grid, List} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities,activityRegistry} = activityStore;
  //  const {selectedActivity, editMode} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])
  
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return (
        <Grid>
            <Grid.Column width="10">
            <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />  
            </Grid.Column>
        </Grid>
    )
})