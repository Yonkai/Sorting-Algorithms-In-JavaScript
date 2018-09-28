(function () {
  //This IIFE contains the four (4) sorting functions: Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort.
  //All are modified from another source. MasterSortingFunction is an ES% constructor. b
  var multiplierForColorWheelSize = 2; //Breaks around 12.
  var colorWheelSizeInitial = 360;
  var totalColorWheelSteps = multiplierForColorWheelSize * colorWheelSizeInitial;
  var initSpeedValueOfAnimation = 500;
  var temporaryVariableDontUse = 0; //User best practice instead.
  //keeps track of changes by the various sorting algorithms.

  /*There's definitely an GOF solution to this, thinking singelton to save memory.
  var bubbleSortObjectToMakeVisualOutputLessPriceyTemplate = {
    recordedChangePointOrder: null,
    changedPostionsInTheArrayForBubbleSort: [null],
    correspondingValuesForWhatTheyWereChangedToo: [null]
  };

  Template of the map 'changingStateList'^
  */


  function MasterSortingFunction() {
    let array = [];
    let changingStateList = new Map();
    var incrementalKey = 0;

    //Helper function
    this.insert = function (item) {
      array = array.concat(item);
    };

    //Helper function
    this.toString = function () {
      return array.join();
    };

    this.showStateList = function () {
      return changingStateList;
    }

    this.recordStateList = function (){

    }

    //return sorted array
    this.toSortedArray = function () {
      return array;
    }

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
      array[index1] = array[index2]; //Change Point
      changingStateList.set(incrementalKey++,'ct');
      changingStateList
      array[index2] = aux; //Change Point

      
      

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
      while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
          result.push(left[il++]);
        } else {
          result.push(right[ir++]);
        }
      }

      while (il < left.length) {
        result.push(left[il++])
      }

      while (ir < right.length) {
        result.push(right[ir++]);
      }

      return result;
    };

  }

  var sortingCall = new MasterSortingFunction();

  function generate360array() {
    var g360a = [];
    for (var i = 0; i < totalColorWheelSteps; i++) {
      g360a[i] = i;
    }
    return g360a;
  }


  // Fisher-Yates (aka Knuth) Shuffle, for reordering color wheel postions.
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

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
  console.log(g360a);
  sortingCall.insert(g360a);
  sortingCall.bubbleSort(); //Doesn't show order/state at each array change as of now...
  console.log(sortingCall.toSortedArray());
  console.log(sortingCall.showStateList());

  //sortedarray is sorted, g360a is what it sorts.
  var sortedArray = sortingCall.toSortedArray();

  //Color wheel initial creation unsorted (provided under MIT licence)Source:_:
  for (var i = 0; i < totalColorWheelSteps; i++) {
    var color = document.createElement("span"); //rescope for the for use in reset function
    color.setAttribute("id", "d" + i);
    color.style.backgroundColor = "hsl(" + (g360a[i]) + ", 100%, 50%)"; //only need to change this part for proper reset.
    color.style.msTransform = "rotate(" + i / multiplierForColorWheelSize + "deg)";
    color.style.webkitTransform = "rotate(" + i / multiplierForColorWheelSize + "deg)";
    color.style.MozTransform = "rotate(" + i / multiplierForColorWheelSize + "deg)";
    color.style.OTransform = "rotate(" + i / multiplierForColorWheelSize + "deg)";
    color.style.transform = "rotate(" + i / multiplierForColorWheelSize + "deg)";
    document.getElementById('colorwheel').appendChild(color);
  };


  displaySortingAnimation = function () {
    //Make it so you delay this by 1/4 second setTimeout...
    //This will have to loop through a set of arrays that are different from the unsorted array, and compare the difference between
    //the two so that set state change in the array from the sorting algorithms gets represented on the color wheel, the final color wheel comparison
    //will of course be sorted, and this will happen behind the scenes. 
    //
    //loop through entire wheel
    // update wheel based on first state of state list from algorithms
    //   if the statelist[2][i] !== statelist[1][i]
    //     set the background color of the wheel spike from previous the statelist[2]
    // end condition is when the last state, the finished array, is looped through and changes the wheel.
    //
    document.getElementById("d" + temporaryVariableDontUse).style.backgroundColor = "hsl(" + sortedArray[temporaryVariableDontUse] + ", 100%, 50%)";
    temporaryVariableDontUse++;
    //Make it so this reads the state from the sorting function instead...
    //console.log(temporaryVariableDontUse);
  };


  var animation = setInterval(displaySortingAnimation, initSpeedValueOfAnimation);
  //Getting form data, needs to be reformatted for onchange event
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[name="algorithms"]').onchange = changeEventHandler;
  }, false);

  document.getElementById("resetButton").addEventListener("click", resetPage);
  document.getElementById("sortButton").addEventListener("click", beginNewSort);


  function resetPage() {
    for (var i = 0; i < totalColorWheelSteps; i++) {
      document.getElementById("d" + i).style.backgroundColor = "hsl(" + g360a[i] + ", 100%, 50%)";

    };
    g360a = generate360array();
    shuffle(g360a);
    temporaryVariableDontUse = 0;
  }

  function beginNewSort() {
    console.log("TODO");
  }

  function changeEventHandler(event) {
    console.log(event);
    var algoDropdown = document.getElementById("algorithmsDropdown");
    var strUser = algoDropdown.options[algoDropdown.selectedIndex].value;
    var strUser2 = algoDropdown.options[algoDropdown.selectedIndex].text;
    console.log(strUser, strUser2);
  }

  var speedDelayElement = document.getElementById('speedDelay');
  speedDelayElement.onchange = function () {
    var r = document.getElementById('speedDelay').value;
    console.log(r);
    clearInterval(animation);
    animation = setInterval(displaySortingAnimation, r);
  };
  //End getting form data, needs to be reformatted  
})();

//Add options for controls for RESET,SPEED DELAY, NUMBER OF VALUES, and a DROP DOWN MENU FOR THE ALGORITHMS, and SOUND like in the youtube videos
//Also display the big-o efficieny chart.
//Make this code less ugly/space it out like express/node code. or just react

//Refactor this code after everything is done with better comments and structures(OOP JS GUIDE).
//Move variables to top, initialize at bottom, functions in the middle, out of global scope, check for leaks