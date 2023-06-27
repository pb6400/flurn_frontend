import axios from 'axios';

const API_BASE_URL = 'https://zsrzpuksbzimwhxqlddb.supabase.co';
const API_KEY = process.env.API_KEY ;
// Function to set up the axios instance with the base URL and headers
const options={
  headers: {     
      apikey: API_KEY,
    'Content-Type': 'application/json',
     Authorization:'Bearer '+localStorage.getItem('access_token')
  }} 

// Function to get the list of applied leaves
export const getLeaves = async () => {
    console.log(options)
  try {
    const response = await axios.get(API_BASE_URL+'/rest/v1/leaves?select=*',options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to apply for a leave
export const applyLeave = async (startDate, endDate, reason) => {

  const apply_opts = options;
  apply_opts.headers.apikey=API_KEY;
  apply_opts.headers.Prefer= 'return=representation';
 

  apply_opts.body={
    
      start_date: startDate,
      end_date: endDate,
      reason:reason
  }

console.log("here");
  try {
    const response = await axios.post('https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves',apply_opts);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to edit a leave
export const editLeave = async (leaveId, startDate, endDate) => {
  const new_opts = options
  new_opts.body = {
    start_date:startDate,
    end_date:endDate
  }

  new_opts.params = {
    id:"eq."+leaveId
  }

  new_opts.headers.Prefer = 'return=representation';
  console.log("here in edit leave",leaveId,startDate,endDate)
  console.log(new_opts);
  try {
    const response = await axios.patch(`https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves?id=eq.${leaveId}`, new_opts);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};


