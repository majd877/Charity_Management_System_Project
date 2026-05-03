import Queue from 'bull';


const languageJop = new Queue('backgroundTasks', {
  redis: { host: '127.0.0.1', port: 6379 }, 
});


languageJop.process(async (job) => {
  console.log('Processing job:', job.data);

  
  await performBackgroundTask(job.data);

  console.log('Job completed');
});


async function performBackgroundTask(data) {
  console.log(`Processing background task with data: ${JSON.stringify(data)}`);
  
}

export default languageJop;
