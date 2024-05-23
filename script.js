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

//WORKING OF THE APP
const colorPicker = document.querySelector('#textColor');
const canvasColor = document.querySelector('#canvasColor');
const canvas = document.querySelector('#myCanvas');
const clearButton = document.querySelector('#clearButton');
const saveButton = document.querySelector('#saveButton');
const retrieveButton = document.querySelector('#retrieveButton');
const fontPicker = document.querySelector('#font-size');

const ctx = canvas.getContext('2d');
