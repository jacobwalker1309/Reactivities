import React, { SyntheticEvent, useState } from 'react';
import {Button, Icon, Item, Label, Segment} from 'semantic-ui-react';
import {Activity} from '../../../app/models/activity';
import {Link} from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';

interface Props {
    activity:Activity
}

export default function ActivityListItem({activity}:Props) {

    const {activityStore} = useStore();
    const {deleteActivity,loading} = activityStore;
    const [target,setTarget] = useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
      <Segment.Group>
          <Segment>
              <Item.Group>
                  <Item>
                     <Item.Image size='tiny' circular src='/assets/user.png' />
                     <Item.Content>
                         <Item.Header 
                         as={Link} to={`/activities/${activity.id}`}>{activity.title}
                         </Item.Header>
                         <Item.Description>Hosted by Bob</Item.Description>
                     </Item.Content>
                     </Item>
              </Item.Group>
          </Segment>
          <Segment>
          <span>
              <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
              <Icon name='marker' /> {format(activity.date, 'dd MMM yyyy h:mm aa')}
          </span>
          </Segment>
          <Segment clearing>
            <span>{activity.description}</span>
            <Button 
            as={Link}
            to={`/activities/${activity.id}`}
            color='red'
            floated='right'
            content='View'
            />
          </Segment>
      </Segment.Group>
    )
}

