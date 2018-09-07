(function () {
  //This IIFE contains the four (4) sorting functions: Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort.
  //All are modified from another source. MasterSortingFunction is an ES% constructor. b

  function MasterSortingFunction() {
    let array = [];

    //Helper function
    this.insert = function (item) {
      array.push(item);
    };

    //Helper function
    this.toString = function () {
      return array.join();
    };

    //Bubble Sort
    this.bubbleSort = function () {
      var length = array.length;
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
          if (array[j] > array[j + 1]) {
            swap(array, j, j + 1);
          }
        }
      }
    }
    //Helper function for Bubble Sort and Selection Sort
    var swap = function (array, index1, index2) {
      var aux = array[index1];
      array[index1] = array[index2];
      array[index2] = aux;
    }

    //Selection Sort
    this.selectionSort = function () {
      var length = array.length;
      var indexMin;

      for (var i = 0; i < length - 1; i++) {
        indexMin = i;
        for (var j = i; j < length; j++) {
          if (array[indexMin] > array[j]) {
            indexMin = j;
          }
        }
        if (i !== indexMin) {
          swap(array, i, indexMin);
        }
      }
    };

    //Insertion Sort
    this.insertionSort = function () {
      var length = array.length;
      var j;
      var temp;

      for (var i = 1; i < length; i++) {
        j = i;
        temp = array[i];

        while (j > 0 && array[j - 1] > temp) {
          array[j] = array[j - 1];
          j--;
        }
        array[j] = temp;
      }
    }
  

  /* 
    The merge sort is a divide-and-conquer algorithm. The idea behind it is to divide 
    original array into smaller arrays until each small array has only one position
    and then merge these smaller arrays into bigger ones until we have a single big array
    at the end that is sorted. 
  */

  //Merge Sort
  this.mergeSort = function () {
    array = mergeSortRecursion(array);
  };

  var mergeSortRecursion = function (array) {
    var length = array.length;
    if (length == 1) {
      return array;
    }
    var mid = Math.floor(length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid, length);

    return merge(mergeSortRecursion(left), mergeSortRecursion(right));
  };

  var merge = function (left, right) {
    var result = [];
    var il = 0;
    var ir = 0;
      while(il < left.length && ir < right.length) {
        if(left[il] < right[ir]){
          result.push(left[il++]);
        } else{
          result.push(right[ir++]);
        }
      }

      while(il < left.length){
        result.push(left[il++])
      }

      while(ir < right.length){
        result.push(right[ir++]);
      }

      return result;
  };

  }

  function generate360array(){
    var g360a = [];
    for (var i=0; i<360; i++) {
      g360a[i]=i;
    }
     return g360a; 
  }


    // Fisher-Yates (aka Knuth) Shuffle, for reordering color wheel postions.
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  var g360a = generate360array();
  shuffle(g360a); 

  //Color wheel creation (provided under MIT licence):
  for (var i=0; i<360; i++) {
    var color = document.createElement("span");
    color.setAttribute("id", "d" + g360a[i]);
    color.style.backgroundColor = "hsl(" + i + ", 100%, 50%)"
    color.style.msTransform = "rotate(" + i + "deg)"
    color.style.webkitTransform = "rotate(" + i + "deg)"
    color.style.MozTransform = "rotate(" + i + "deg)"
    color.style.OTransform = "rotate(" + i + "deg)"
    color.style.transform = "rotate(" + i + "deg)"
    document.getElementById('colorwheel').appendChild(color);
  };

  //Set up in a prototype hierarchy hierarchy
  //Canvas Visualization, using sorting code to sort color circle
  //Use the other color wheel instead it looks nicer.
  //Add options for controls for RESET,SPEED DELAY, NUMBER OF VALUES, and a DROP DOWN MENU FOR THE ALGORITHMS, and SOUND like in the youtube videos
  //Also display the big-o efficieny chart.
})();

