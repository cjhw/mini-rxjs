import { Scheduler } from '../Scheduler.js'
import { AsyncAction } from './AsyncAction.js'

export const asyncScheduler = new Scheduler(AsyncAction)
