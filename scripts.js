var note_add =document.getElementById('note-add');
var note_title =document.getElementById('note-title');
var note_details =document.getElementById('note-details');
showNotices()
note_add.addEventListener('click',(e)=>{
    e.preventDefault();
    if(note_title.value=='' || note_details.value=='')
    {
        alert('Enter All Required Values ');
       
    }
    var notes=localStorage.getItem('notes');
    var notesObj;
    if(notes==null)
    {
        notesObj=[];
       
    }
    else{
    notesObj=JSON.parse(notes);

    }
    var myObj={
        
        title : note_title.value,
        details : note_details.value,
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    note_title.value='';
    note_details.value='';

    showNotices();

});
function showNotices(){
    var notes=localStorage.getItem('notes');

    var notesObj
    if(notes==null)
    {
        notesObj=[];
    }
    else{
    notesObj=JSON.parse(notes);

    }
    var html='';
    notesObj.forEach((ele,index) => {
        html+= `
        <div class="note">
                <p> note ${index+1}</p>
                <p class='n-t'> ${ele.title}</p>
                <p> ${ele.details}</p>
                <button class="edit" onclick=edit(${index})> Edit Note</button>
                <button  id="${index}" class="delet" onclick=delett(${index})> Delet Note</button>
            </div>
        `
        
    });
document.querySelector('.notes').innerHTML=html;
if(notesObj.length==0){ document.querySelector('.notes').innerHTML=`<h3> There are no notes !!</h3>`;}
}
function delett(index){
   let conf=confirm('Are U sure you wanna delet this');
   if(conf==true)
   {
    var allNotes=JSON.parse(localStorage.getItem('notes'));
    allNotes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(allNotes));
    showNotices();
   }
}
function edit(index){
    var allNotes=JSON.parse(localStorage.getItem('notes'));
  var myEdite=  allNotes.find((ele,ind)=>{ return ind==index ;});
  note_title.value=myEdite.title ;
  note_details.value=myEdite.details;
  allNotes.splice(index,1);
  localStorage.setItem('notes',JSON.stringify(allNotes));

  showNotices();



}