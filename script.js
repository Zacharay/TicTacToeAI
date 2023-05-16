class App{
    #board;
    #player ='o';
    #ai = 'x';
    #gameState=true;
    #tiles;
    constructor()
    {
        this.#board = ['','','','','','','','',''];

        this.#tiles = document.querySelectorAll(".tile");
        this.#tiles.forEach((tile,idx) => {
                tile.addEventListener("click",()=>{
                    if(this.#gameState==true){
                        this._makeMove(idx);
                    }
                });
        });

        const restartBtn = document.querySelector(".restart-btn");
        restartBtn.addEventListener('click',this._restartGame.bind(this));
    }
    _restartGame()
    {
        const result =document.querySelector(".result")
        result.classList.add("hidden")
        this.#gameState = true;
        this.#board = ['','','','','','','','',''];
        this._updateBoard();
    }
    _makeMove(idx)
    {
        if(this.#board[idx]!='')return;
       

        this.#board[idx]=this.#player;
            
        const best_move = this._findBestMove();
        this.#board[best_move]=this.#ai;
       
        this._updateBoard();
        const winner = this._checkWinner();
     
        if(winner)
        {
            this.#gameState=false;
            this._gameOver(winner);
        }
    }
    _updateBoard()
    {
     
        for(let i=0;i<9;i++)
        {
            if(this.#board[i] =='x')
            {
                
                this.#tiles[i].style.backgroundImage="url('x.svg')";
            }
            else if(this.#board[i] =='o')
            {
                this.#tiles[i].style.backgroundImage="url('circle.svg')";
            }
            else{
                this.#tiles[i].style.backgroundImage='none';
            }
        }
    }
    _checkWinner()
    {
        let winner = null
        //horizontal
        for(let i=0;i<=6;i+=3)
        {
            if(this.#board[i]==this.#board[i+1]&&this.#board[i+2]==this.#board[i]&&this.#board[i]!='')
            {
               
                winner = this.#board[i];
            }
        }
        //vertical
        for(let i=0;i<=2;i++)
        {
            if(this.#board[i]==this.#board[i+3]&&this.#board[i]==this.#board[i+6]&&this.#board[i+6]!='')
            {
          
                winner = this.#board[i];
            }
        }
        //diagonal
        if(this.#board[0]==this.#board[4]&&this.#board[0]==this.#board[8]&&this.#board[4]!='')
        {
            winner = this.#board[0];
        }
        if(this.#board[2]==this.#board[4]&&this.#board[2]==this.#board[6]&&this.#board[4]!='')
        {
            winner = this.#board[2];
        }

        //checkIfTie
        let emptySquares=9;
        for(let i=0;i<9;i++)
        {
            if(this.#board[i]!='')emptySquares--;
        }
        if(emptySquares==0&&winner==null)winner = 'tie';
        return winner;
    }
    _gameOver(winner)
    {
        const result = document.querySelector('.result');
        result.classList.remove("hidden");
        if(winner=='x')
        {
            result.innerHTML = 'X Wins';
        }
        else if(winner=='o')
        {
            result.innerHTML = 'O Wins';
        }
        else{
            result.innerHTML = 'Tie';
        }
    }
    _findBestMove()
    {
        
        let bestScore = -Infinity;
        let bestMove;
        for(let i=0;i<9;i++)
        {
            if(this.#board[i]=='')
            {
                this.#board[i]=this.#ai;
                let score = this._minimax(0,false);
                this.#board[i]='';
                if(score>bestScore)
                {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }
    _minimax(depth,isMax)
    {
        const winner = this._checkWinner();
        if(winner!=null)
        {
            
            if(winner =='x')return (10-depth);
            else if(winner=='tie')return 0;
            else return -10;
        }

        if(isMax)
        {
            let bestScore = -Infinity;
            for(let i=0;i<9;i++)
            {
                if(this.#board[i]=='')
                {
                    this.#board[i] =this.#ai;
                    let score = this._minimax(depth+1,false);
                    this.#board[i] = '';
                    bestScore = Math.max(score,bestScore);
                }
            }
            return bestScore;
        }
        else{
            let bestScore = Infinity;
            for(let i=0;i<9;i++)
            {
                if(this.#board[i]=='')
                {
                    this.#board[i] =this.#player;
                    let score = this._minimax(depth+1,true);
                    this.#board[i] = '';
                    bestScore = Math.min(score,bestScore);
                }
            }
            return bestScore;
        }
    }
}
const app = new App();