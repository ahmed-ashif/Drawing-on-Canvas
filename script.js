//ANIMATION
    var tlm = gsap.timeline();

    tlm.from("h1",{
      opacity : 0,
      y : -30,
      duration : 0.5,
      delay : 0
    });

    tlm.from(".block", {
      opacity : 0,
      x : -30,
      duration : 0.5,
      delay : 0,
      stagger: 0.2
    })

    tlm.from("canvas", {
      opacity : 0,
      x : 50,
      duration : 0.5,
      delay : 0
    })

    tlm.from(".btn", {
      opacity : 0,
      x : -30,
      duration : 0.5,
      delay : 0,
      stagger: 0.2
    })

    let history = [];

    const colorPicker = document.querySelector('#textColor');
    const fontPicker = document.querySelector('#fontSizePicker');
    const fontSizePicker = document.querySelector('#fontSizePicker');
    const canvasColor = document.querySelector('#canvasColor');
    const canvas = document.querySelector('#myCanvas');
    const clearButton = document.querySelector('#clearButton');
    const saveButton = document.querySelector('#saveButton');
    const retrieveButton = document.querySelector('#retrieveButton');
    const textInput = document.getElementById('textInput');  // add new element

    const ctx = canvas.getContext('2d');

    // Selecting the color of the font
    colorPicker.addEventListener('change',(e)=>{
      ctx.strokeStyle = e.target.value;
      ctx.fillStyle = e.target.value;
    });

    // Selecting the color of the canvas background
    canvasColor.addEventListener('change',(e)=>{
      ctx.fillStyle = e.target.value;
      ctx.fillRect(0,0,700,650);
    });

    // Drawing on the canvas
    canvas.addEventListener('mousedown',(e) => {
      isDrawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    });

   canvas.addEventListener('mousemove',(e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    });

    canvas.addEventListener('mouseup',(e)=>{
      isDrawing = false;
    });

    // Selecting the font size
    fontSizePicker.addEventListener('change',(e)=>{
      ctx.lineWidth = e.target.value;
    });

    // Clear button
    clearButton.addEventListener('click',()=>{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

     // Save button
     saveButton.addEventListener('click', () => {
      localStorage.setItem('canvasContents', canvas.toDataURL());
      
      // Create a new anchor tag element
      let link = document.createElement('a');

      // Set the download attribute and the href attribute of the <a> element
      link.download = 'my drawing.png';
      link.href = canvas.toDataURL();

      // Dispatch a click event on the <a> element
      link.click();
   });

   // Retrieve button
   retrieveButton.addEventListener('click', () => {
    // Retrieving the saved canvas contents from local storage
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});

// Touch for phone screen
function getTouchPos(canvasDom, touchEvent) {
  const rect = canvasDom.getBoundingClientRect();
  return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
  };
}
canvas.addEventListener('touchstart', (e)=>{
    drawing = true;
    const pos = getTouchPos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault();
});
canvas.addEventListener('touchmove', (e)=>{
  if (!drawing) return;
  const pos = getTouchPos(canvas, e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  e.preventDefault();
});
canvas.addEventListener('touchend', (e)=>{
  if (!drawing) return;
  drawing = false;
  ctx.closePath();
  e.preventDefault();
} );
canvas.addEventListener('touchcancel', (e)=>{
  if (!drawing) return;
  drawing = false;
  ctx.closePath();
  e.preventDefault();
});
