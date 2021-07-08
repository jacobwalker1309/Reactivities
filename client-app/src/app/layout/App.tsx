import React, { useEffect, useState } from 'react';
import './styles.css';
import NavBar from './NavBar';
import axios from 'axios';
import { Header, List ,Container, Loader, Button} from 'semantic-ui-react';
import {Activity} from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [loading,setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
   activityStore.loadActivities();
  }, [])

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  // function handleSelectedActivity(id:string){
  //   setSelectedActivity(activities.find(x => x.id === id))
  // }

  // function handleCancelSelectActivity(){
  //   setSelectedActivity(undefined);
  // }

  // function handleFormOpen(id?: string){
  //   id ? handleSelectedActivity(id) : handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose(){
  //   setEditMode(false);
  // }

  // function handleCreateOrEditActivity(activity:Activity){
  //   setSubmitting(true);
  //   if(activity.id){
  //     agent.Activities.update(activity).then(()=> {
  //       setActivities([...activities.filter(x => x.id !== activity.id),activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     });
  //   }
  //   else{
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(()=>{
  //       setActivities([...activities,activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }
  // }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }



  return (
    <div>
     <NavBar/>
    <Container style={{marginTop:'7em'}}>
   <ActivityDashboard 
  //  createOrEdit = {handleCreateOrEditActivity}
   
   />
    </Container>
    </div>
  );
}

export default observer(App);
