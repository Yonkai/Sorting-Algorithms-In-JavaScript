(function () {
  //This IIFE contains the four (4) sorting functions: Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort.
  //All are modified from another source. MasterSortingFunction is an ES% constructor. b
  var multiplierForColorWheelSize = 1; //Breaks around 12.
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

    this.insert = function (item) {
      array = array.concat(item);
    };

    this.toString = function () {
      return array.join();
    };

    this.showStateList = function () {
      return changingStateList;
    }

    //return sorted array
    this.toSortedArray = function () {
      return array;
    }

    this.bubbleSort = function () {
      var length = array.length;
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
          if (array[j] > array[j + 1]) {
            swap(array, j, j + 1,'bubble');
          }
        }
      }
    }

    //Helper function for Bubble Sort and Selection Sort
    var swap = function (array, index1, index2, sortfunc) {
      var aux = array[index1];
      var aux2 = array[index2];
      array[index1] = array[index2]; //Change Point
      if(sortfunc === 'bubble'){
       changingStateList.set(incrementalKey++,index1)//index in array/colorwheel to change
       changingStateList.set(incrementalKey++,aux)//from this number (actually apart of the bubble sort)
       changingStateList.set(incrementalKey++,aux2)//to this number (actually apart of the bubble sort)
  
      }
      array[index2] = aux; //Change Point
      if(sortfunc === 'bubble'){
        changingStateList.set(incrementalKey++,index2)//index in arraycolorwheel to change
        changingStateList.set(incrementalKey++,aux2)//from this number (actually apart of the bubble sort)
        changingStateList.set(incrementalKey++,aux)//to this number (actually part of the bubble sort)
       }
    }

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
      Merge sort is a divide-and-conquer algorithm. The idea behind it is to divide 
      original array into smaller arrays until each small array has only one position
      and then merge these smaller arrays into bigger ones until we have a single big array
      at the end that is sorted. 
    */

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

  //Genenerates an array that is in intervals of 360 denominations, ie 360,720..
  function generate360array() {
    var g360a = [];
    for (var i = 0; i < totalColorWheelSteps; i++) {
      g360a[i] = i;
    }
    return g360a;
  }


  // Fisher-Yates Shuffle algorithm;For reordering color wheel spokes postions.
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
  console.log(`Reading instructions for state list for bubble sort; follows this pattern:`);
  console.log(`0:index changed,1:what that index is was,2: what that index is changed too. etc`);
  console.log(sortingCall.showStateList());
  var stateList = sortingCall.showStateList(); //Man this code is getting sloppy... Plan to fix.
  //Side note, might want to move most of the functionality below to reset page later and base it off of the selected sort algorithm,
  //also add a side explanation to the page for each sorting algorithm so it is more intuitive.

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

var cTemp = -1;
  displaySortingAnimation = function () {
    //based on instructions in console for BUBBLE SORT:
    document.getElementById("d" + stateList.get(cTemp+=1)).style.backgroundColor = "hsl(" + stateList.get(cTemp+=1) + ", 100%, 50%)";
    document.getElementById("d" + stateList.get(cTemp-=1)).style.backgroundColor = "hsl(" + stateList.get(cTemp+=2) + ", 100%, 50%)";
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
    console.log(r+"ms: New speed delay.");
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