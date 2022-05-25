export const initBoardData = (height: number, width: number, mines: number) => {
    let data = createEmptyArray(height, width);
    data = plantMines(data, height, width, mines);
    data = getNeighbours(data, height, width);
    console.log(data);
    return data;
  };
  
  export const traverseBoard = (
    x: number,
    y: number,
    data: any,
    height: number,
    width: number
  ) => {
    const el = [];
  
    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }
  
    //down
    if (x < height - 1) {
      el.push(data[x + 1][y]);
    }
  
    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }
  
    //right
    if (y < width - 1) {
      el.push(data[x][y + 1]);
    }
  
    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }
  
    // top right
    if (x > 0 && y < width - 1) {
      el.push(data[x - 1][y + 1]);
    }
  
    // bottom right
    if (x < height - 1 && y < width - 1) {
      el.push(data[x + 1][y + 1]);
    }
  
    // bottom left
    if (x < height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }
  
    return el;
  };
  
  // get number of neighbouring mines for each board cell
  export const getNeighbours = (data: any, height: number, width: number) => {
    let updatedData = data;
  
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(
            data[i][j].x,
            data[i][j].y,
            data,
            height,
            width
          );
          area.map((value: any) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }
  
    return updatedData;
  };
  
  export const getMines = (data: any) => {
    let mineArray: any[] = [];
  
    data.map((datarow: any) => {
      datarow.map((dataitem: any) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });
  
    return mineArray;
  };
  
  export const getFlags = (data: any) => {
    let flagArray: any[] = [];
  
    data.map((datarow: any) => {
      datarow.map((dataitem: any) => {
        if (dataitem.isFlagged) {
          flagArray.push(dataitem);
        }
      });
    });
  
    return flagArray;
  };
  
  export const getHidden = (data: any) => {
    let hiddenArray: any[] = [];
  
    data.map((datarow: any) => {
      datarow.map((dataitem: any) => {
        if (!dataitem.isRevealed) {
          hiddenArray.push(dataitem);
        }
      });
    });
  
    return hiddenArray;
  };
  
  export const getRandomNumber = (dimension: any) => {
    return Math.floor(Math.random() * 1000 + 1) % dimension;
  };
  
  export const createEmptyArray = (height: number, width: number) => {
    let data: any[] = [];
  
    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  };
  // plant mines on the board
  export const plantMines = (
    data: any,
    height: number,
    width: number,
    mines: number
  ) => {
    let randomx,
      randomy,
      minesPlanted = 0;
  
    while (minesPlanted < mines) {
      randomx = getRandomNumber(width);
      randomy = getRandomNumber(height);
      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }
  
    return data;
  };
  
  /* reveal logic for empty cell */
  export const revealEmpty = (
    x: number,
    y: number,
    data: any,
    height: number,
    width: number
  ) => {
    let area = traverseBoard(x, y, data, height, width);
  
    area.map((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data, height, width);
        }
      }
    });
  
    return data;
  };