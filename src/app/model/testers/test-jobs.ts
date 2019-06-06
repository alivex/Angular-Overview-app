import { Job } from '../job';

/** return fresh array of test heroes */
export function getTestJobs(): Job[] {
  return [
    {id: 881, title: 'Bob', state:'active'},
    {id: 882, title: 'Carol', state:'active'},
    {id: 883, title: 'Ted', state:'active'},
    {id: 884, title: 'Alice', state:'active'},
    {id: 885, title: 'Speedy', state:'active'},
    {id: 886, title: 'Stealthy', state:'active'}
  ];
}