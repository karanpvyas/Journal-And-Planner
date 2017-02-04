import '../css/master.scss';

import TodoBox from './TodoBox'
import React from 'react'
import ContentEditable from './ContentEditable'
import {render} from 'react-dom'
import GoalBox from './GoalBox'

render(<Journal />, document.querySelector('#JournalAndPlannerApp'));
