document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('open'));
document.querySelector('form').addEventListener('submit',(event)=>{event.preventDefault();const button=event.currentTarget.querySelector('button');button.textContent='✓';button.style.background='#152a45';});
