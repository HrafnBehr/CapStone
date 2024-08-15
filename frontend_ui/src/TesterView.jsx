import {
  GanttComponent,
  Inject,
  Selection,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-gantt'
import { tasks } from './data/tasks'

export default function TesterView() {
  const fields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
  }

  const labelSettings = {
    leftLabel: 'TaskName',
  }

  const projectStartDate = new Date('03/24/2024')
  const projectEndDate = new Date('07/06/2024')

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent
          id='Default'
          dataSource={tasks}
          treeColumnIndex={1}
          taskFields={fields}
          labelSettings={labelSettings}
          height='1000px'
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
        >
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective
              field='TaskName'
              headerText='Job Name'
              width='250'
              clipMode='EllipsisWithTooltip'
            ></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
    </div>
  )
}
