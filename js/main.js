(function(){

function MasterSortingFunction(){
    let array = [];

    this.insert = function(item){
        array.push(item);
    };

    this.toString = function(){
        return array.join();
    };

    //Bubble Sort
    this.bubbleSort = function(){
        var length = array.length;
        for(var i=0;i<length;i++){
            for(var j=0;j<length-1-i;j++){
                if(array[j]>array[j+1]){
                    swap(array,j, j+1);
                }
            }
        }
    }

    var swap = function(array, index1, index2){
        var aux = array[index1];
        array[index1]=array[index2];
        array[index2]= aux;
    }
}

//Set up in a prototype hierarchy hierarchy

//Selection Sort

//Insertion Sort

//Bogo Sort

//Merge Sort

//Quick Sort

//Canvas Visualization, using sorting code to sort color circle
//https://codepen.io/Yonkai/pen/gdOzYz?editors=0010
})();