export const CreateBoard = (user) => {
   if(document.querySelector('.player') && document.querySelector('.computer')) return;
  const size = 10;
  const boards = document.createElement("div");
  boards.classList.add('boards')
  boards.classList.add(user);
  document.querySelector(".board-container").appendChild(boards);

  for(let i = 0; i< size * size ; i++)
  {
    const div = document.createElement('div');
    div.setAttribute("id",i);
    div.classList.add("cell");
    boards.appendChild(div);
  }

};
