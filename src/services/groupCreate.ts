import { supabase } from "@/utils/supabase";

export default async function createGroup (name:string, description:string, uid:string) {
const {data,error} = await supabase.from('group').insert({name,description}).select();

if(error) {
    console.error("Error happened when creating group: ",error);
}
else if(data) {
    console.log("Successfull group creation", data[0]?.id);
const{data:data1, error:error1} = await supabase.from('usergroup').insert({uid:uid,gid:data[0]!.id})

if(error1) {
    console.error("Error in usergroup: ", error1)
}
else if(data1) {
    console.log("Succedded in usergroup: ", data1);
    
}
}

}