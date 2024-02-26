const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 1900,
        height: 850,
        selection: false,
    });
  }
  const canvas = initCanvas('canvas');
    
    function changeAction(target) {
      ['select','pen','draw','spray', 'eraser'].forEach(action => {
        const t = document.getElementById(action);
        t.classList.remove('active');
      });
    if(typeof target==='string') target = document.getElementById(target);
      target.classList.add('active');
      switch (target.id) {
        case "select":
          canvas.isDrawingMode = false;
          currentMode = true;
          break;
          case "pen":
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = 10;
          canvas.freeDrawingBrush.color = color;
          canvas.isDrawingMode = true;
            break;
        case "draw":
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = 35;
          canvas.freeDrawingBrush.color = color;
          canvas.isDrawingMode = true;
          
          break;
        case "spray":
          canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
          canvas.freeDrawingBrush.width = 35;
          canvas.freeDrawingBrush.color = color;
          canvas.isDrawingMode = true;
          break;
        case "eraser":
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = 35;
          canvas.freeDrawingBrush.color = 'white';
          break;
        default:
          break;
      }
      
    }
        canvas.on('mouse:up', () => {
        hubConnection.invoke("Send", JSON.stringify(canvas))
  }) 
   var colorPicker = document.getElementById('colorPicker');
      colorPicker.addEventListener('change', (event) => {
      color = event.target.value;
      canvas.freeDrawingBrush.color = color;
   }) 
  const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/ServerHub")
      .build();
  
  hubConnection.on('Send', function (message) {
      canvas.loadFromJSON(message);
  }); 
  color = "black";
  hubConnection.start();