import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState, GroupingState, IntegratedGrouping, IntegratedEditing, EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
  AppointmentForm,
  DateNavigator,
  TodayButton,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  teal, indigo,
} from '@mui/material/colors';

const appointments = [{
  id: 0,
  title: 'Soccer 1',
  members: [1],
  roomId: 1,
  startDate: new Date(2024, 1, 1, 9, 30),
  endDate: new Date(2024, 1, 1, 10, 30),
}, {
  id: 1,
  title: 'Basketball 1',
  members: [2],
  roomId: 2,
  startDate: new Date(2024, 1, 1, 12, 30),
  endDate: new Date(2024, 1, 1, 13, 30),
}, {
  id: 2,
  title: 'Soccer 2',
  members: [3],
  roomId: 3,
  startDate: new Date(2024, 1, 1, 12, 30),
  endDate: new Date(2024, 1, 1, 13, 30),
}, {
  id: 3,
  title: 'Basketball 2',
  members: [4],
  roomId: 4,
  startDate: new Date(2024, 1, 1, 9, 30),
  endDate: new Date(2024, 1, 1, 11, 0),
}, {
  id: 4,
  title: 'Soccer 3',
  members: [5],
  roomId: 5,
  startDate: new Date(2024, 0, 31, 9, 30),
  endDate: new Date(2024, 0, 31, 11, 0),
},
{
  id: 5,
  title: 'Tennis 1',
  members: [4],
  roomId: 4,
  startDate: new Date(2024, 1, 2, 12, 30),
  endDate: new Date(2024, 1, 2, 14, 0),
},
{
  id: 6,
  title: 'Tennis 2',
  members: [4],
  roomId: 4,
  startDate: new Date(2024, 1, 2, 14, 30),
  endDate: new Date(2024, 1, 2, 15, 0),
},
{
  id: 7,
  title: 'Tennis 3',
  members: [4],
  roomId: 4,
  startDate: new Date(2024, 1, 2, 15, 0),
  endDate: new Date(2024, 1, 2, 16, 0),
},
{
  id: 8,
  title: 'Soccer 3',
  members: [4],
  roomId: 6,
  startDate: new Date(2024, 1, 2, 9, 30),
  endDate: new Date(2024, 1, 2, 11, 0),
}];

const owners = [
  { text: 'User 1', id: 1 },
  { text: 'User 2', id: 2 },
  { text: 'User 3', id: 3 },
  { text: 'User 4', id: 4 },
  { text: 'User 5', id: 5 },
  { text: 'User 6', id: 6 },
];

const locations = [
  { text: 'Field 1', id: 1, color: indigo },
  { text: 'Field 2', id: 2, color: indigo },
  { text: 'Field 3', id: 3, color: indigo },
  { text: 'Field 4', id: 4, color: indigo },
  { text: 'Field 5', id: 5, color: indigo },
  { text: 'Field 6', id: 6, color: indigo },
  { text: 'Field 7', id: 7, color: indigo },
  { text: 'Field 8', id: 8, color: indigo },
  { text: 'Field 9', id: 9, color: indigo },
  { text: 'Field 10', id: 10, color: indigo },
  { text: 'Field 11', id: 11, color: indigo },
  { text: 'Field 12', id: 12, color: indigo },

];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [{
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      }, {
        fieldName: 'roomId',
        title: 'Location',
        instances: locations,
      }],
      grouping: [{
        resourceName: 'roomId',
      }],
      daysInView: 3,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  updateDaysInView(newDays) {
    this.setState({daysInView: newDays});
  }

  render() {
    const { data, resources, grouping, daysInView } = this.state;

    return (
      <Paper>
        <div className='row'>
          <div className='row-item' onClick={() => this.updateDaysInView(1)}>1</div>
          <div className='row-item' onClick={() => this.updateDaysInView(2)}>2</div>
          <div className='row-item' onClick={() => this.updateDaysInView(3)}>3</div>
        </div>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2024-02-01"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
          />

          <DayView
            startDayHour={9}
            endDayHour={18}
            intervalCount={daysInView}
          />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="roomId"
          />

          <IntegratedGrouping />
          <IntegratedEditing />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AppointmentTooltip showOpenButton />
          <AppointmentForm />
          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
