(function () {
  //This IIFE contains the four sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort.
  //All are modified from another source. MasterSortingFunction is an ES5 constructor.
  var colorWheelSizeInitial = 100; //"No. Spikes" input
  var multiplierForColorWheelSize = 1;
  var initSpeedValueOfAnimationMilliseconds = 100;
  var totalColorWheelSteps = multiplierForColorWheelSize * colorWheelSizeInitial;
  //Makes it so there is a always a full circle no matter what the size of the wheel.
  var colorWheelIndividualSpikesAngleChange = 360/totalColorWheelSteps;
  //Higher numbers add a higher color range:=, and vice versa.
  var rangeOfColorsMultiplier = 3; //"Color Range" input
  var currentlySelectedAlgorithm;

  //Form 'algorithm informaiton' text 
  var information = {
    BubbleSort: `Bubble Sort works by repeatedly swapping the
     adjacent elements if they are in the 
    wrong order. It is n^2 complexity.`,
    BubbleSortWiki: `https://en.wikipedia.org/wiki/bubble_sort`,
    InsertionSort: `Insertion sort is a simple sorting algorithm that builds the
     final sorted array (or list) one 
     item at a time.`,
    InsertionSortWiki: `https://en.wikipedia.org/wiki/Insertion_sort`,
    merge: `mege sort sort is a divide and conquer sorting algorithm.`,
    MergeSortWiki: `https://en.wikipedia.org/wiki/Merge_sort`,
    SelectionSort: `In palce comparision sort.`,
    SelectionSortWiki: `https://en.wikipedia.org/wiki/Selection_sort`
  };


  //Sorting Algorithm constructor
  function MasterSortingFunction() {
    let array = [];
    //Records the changes in the array caused by the sorting algorithms so that it can be played back later.
    let changingStateList = new Map();
    var incrementalKey = 0;

    this.insert = function (item) {
      //Changes
      array = [];
      incrementalKey = 0;
      changingStateList.clear();
      

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
            swap(array, j, j + 1, 'bubble');
          }
        }
      }
    }

    //Helper function for Bubble Sort and Selection Sort
    var swap = function (array, index1, index2, sortfunc) {
      var aux = array[index1];
      var aux2 = array[index2];
      array[index1] = array[index2]; //Change Point
      //NEED TO MAKE SURE THIS IS ACTUALLY LEGITMATE BECAUSE IT TOTALLY COULD NOT BE
      //CHANGES -> SWITCHED SORTING FUNC SELECTED BELOW AND ADDED '|| `selection`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (sortfunc === 'bubble' || sortfunc ==='selection') {
        changingStateList.set(incrementalKey++, index1) //index in array/colorwheel to change
        changingStateList.set(incrementalKey++, aux) //from this number (actually apart of the bubble sort)
        changingStateList.set(incrementalKey++, aux2) //to this number (actually apart of the bubble sort)

      }
      array[index2] = aux; //Change Point
      if (sortfunc === 'bubble' || sortfunc==='selection') {
        changingStateList.set(incrementalKey++, index2) //index in arraycolorwheel to change
        changingStateList.set(incrementalKey++, aux2) //from this number (actually apart of the bubble sort)
        changingStateList.set(incrementalKey++, aux) //to this number (actually part of the bubble sort)
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
          swap(array, i, indexMin, 'selection');
        }
      }
    };

    this.insertionSort = function () {
      var length = array.length;
      var j;
      var temp;

      for (var i = 0; i < length; i++) {
        j = i;
        temp = array[i];

        while (j > 0 && array[j - 1] > temp) {
          var statelisttemp=array[j];
          array[j] = array[j - 1]; //Change Point add this
          var index = j;
          var changedstatelisttemp=array[j];
          j--;
          //BUG: First part of array doesn't sort/display
          changingStateList.set(incrementalKey++, index); //index in arraycolorwheel to change
          changingStateList.set(incrementalKey++, statelisttemp);//from this number (actually apart of the  sort)
          changingStateList.set(incrementalKey++, changedstatelisttemp); //to this number (actually part of the  sort)
          
        }
        array[j] = temp; //Change Point
        //changingStateList
      }
    }


    /* 
      Merge sort is a divide-and-conquer algorithm. The idea behind it is to divide 
      original array into smaller arrays until each small array has only one position
      and then merge these smaller arrays into bigger ones until we have a single big array
      at the end that is sorted. 
    */

    /*Stack trace merge sort */
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
           changingStateList.set(incrementalKey++,result);
        } else {
          result.push(right[ir++]);
          changingStateList.set(incrementalKey++,result);

        }
      }

      while (il < left.length) {
        result.push(left[il++]);

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

  // Dev: Debugging
  var g360a = generate360array();
  shuffle(g360a);
  console.log(g360a);
  sortingCall.insert(g360a);
  sortingCall.selectionSort(); 
  console.log(sortingCall.toSortedArray());
  console.log(`Reading instructions for state list for bubble sort; follows this pattern:`);
  console.log(`0:index changed,1:what that index is was,2: what that index is changed too. etc`);
  console.log(sortingCall.showStateList());
  var stateList = sortingCall.showStateList(); //Need to clean up code so it is less sloppy.
  //Side note, might want to move most of the functionality below to reset page later and base it off of the selected sort algorithm,
  //also add a side explanation to the page for each sorting algorithm so it is more intuitive.

  //Color wheel initial creation unsorted (provided under MIT licence)Source:_:
  for (var i = 0; i < totalColorWheelSteps; i++) {
    var color = document.createElement("span"); //rescope for the for use in reset function
  color.setAttribute("id", "d" + i); 
    color.style.backgroundColor = "hsl(" + (g360a[i]*rangeOfColorsMultiplier) + ", 100%, 50%)"; //only need to change this part for proper reset.
    color.style.msTransform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";//spikes divided by 360?
    color.style.webkitTransform = "rotate("+ i*(colorWheelIndividualSpikesAngleChange) + "deg)";
    color.style.MozTransform = "rotate(" +i*(colorWheelIndividualSpikesAngleChange) + "deg)";
    color.style.OTransform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";
    color.style.transform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";
    document.getElementById('colorwheel').appendChild(color);
  };

  var cTemp = -1;
  var displaySortingAnimationFlag = false;
  displaySortingAnimation = function () {
    if(displaySortingAnimationFlag){

    }else{
    //based on (or for) instructions in console for BUBBLE SORT, INSERTION SORT, AND SELECTION SORT:
    document.getElementById("d" + stateList.get(cTemp += 1)).style.backgroundColor = "hsl(" + stateList.get(cTemp += 1)*rangeOfColorsMultiplier + ", 100%, 50%)";
    document.getElementById("d" + stateList.get(cTemp -= 1)).style.backgroundColor = "hsl(" + stateList.get(cTemp += 2)*rangeOfColorsMultiplier + ", 100%, 50%)";
    }
  };

  var animation = setInterval(displaySortingAnimation, initSpeedValueOfAnimationMilliseconds);

  //Getting form data:
  document.addEventListener('DOMContentLoaded', function () {
    //document.querySelector('select[name="algoselections"]').onchange = changeEventHandler;
  }, false);

  document.getElementById("resetButton").addEventListener("click", resetPage);



  //Reset based on inputed info, should handle selected algorithm, spikes, and color range
  function resetPage() {
    //remove
    var myNode = document.getElementById("colorwheel");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
   //recreate
    for (var i = 0; i < totalColorWheelSteps; i++) {
      var color = document.createElement("span"); //rescope for the for use in reset function
      color.setAttribute("id", "d" + i); 
      color.style.backgroundColor = "hsl(" + (g360a[i]*rangeOfColorsMultiplier) + ", 100%, 50%)"; //only need to change this part for proper reset.
      color.style.msTransform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";//spikes divided by 360?
      color.style.webkitTransform = "rotate("+ i*(colorWheelIndividualSpikesAngleChange) + "deg)";
      color.style.MozTransform = "rotate(" +i*(colorWheelIndividualSpikesAngleChange) + "deg)";
      color.style.OTransform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";
      color.style.transform = "rotate(" + i*(colorWheelIndividualSpikesAngleChange) + "deg)";
      document.getElementById('colorwheel').appendChild(color);
    };
   //reset colors
    for (var i = 0; i < totalColorWheelSteps; i++) {
      document.getElementById("d" + i).style.backgroundColor = "hsl(" + g360a[i]*rangeOfColorsMultiplier + ", 100%, 50%)";

    };
 
  //DRY Code Below:
  g360a = generate360array();
  shuffle(g360a);
  console.log(g360a);
  sortingCall.insert(g360a);
  //Change this based on selected algorithm, also, update information. Switch?
  switch(currentlySelectedAlgorithm){
    case 'BubbleSort':
      sortingCall.bubbleSort(); 
      break;
    case 'InsertionSort':
      sortingCall.insertionSort(); 
      break;
    case 'SelectionSort':
      sortingCall.selectionSort(); 
      break;
    default:
    console.error("Something went wrong with the algorithm seleciton!");

  }
  
  console.log(sortingCall.toSortedArray());
  console.log(`Reading instructions for state list for bubble sort; follows this pattern:`);
  console.log(`0:index changed,1:what that index is was,2: what that index is changed too. etc`);
  console.log(sortingCall.showStateList());
  stateList = sortingCall.showStateList();
  cTemp = -1;

  }

  
  function changeEventHandler(event) {
    console.log(event);
    //Switch an algorithm Flag
  }

  //speed delay input, handled immediately
  var speedDelayElement = document.getElementById('speedDelay');
  speedDelayElement.onchange = function () {
    let milliseconds = document.getElementById('speedDelay').value;
    console.log(milliseconds + "ms: New speed delay.");
    clearInterval(animation);
    animation = setInterval(displaySortingAnimation, milliseconds);
  };
  
  //spike count input
  var spikeCountElement = document.getElementById('spikeCount');
  spikeCountElement.onchange = function () {
    let spikes = document.getElementById('spikeCount').value;
    console.log(spikes);
    totalColorWheelSteps = spikes;
    colorWheelIndividualSpikesAngleChange = 360/totalColorWheelSteps;
    
    
  };
  //color range input
  var colorRangeElement = document.getElementById('colorRange');
  colorRangeElement.onchange = function () {
    let colorrange = document.getElementById('colorRange').value;
    console.log(colorrange);
    rangeOfColorsMultiplier = colorrange;
  }

  //information change, handled immediately
  var radios = document.getElementsByName('algoselections');
  var radioFormAlgo = document.getElementById('algoForm');

  radioFormAlgo.addEventListener("click", function(){
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        // Dev: for debugging.
        console.log(radios[i].value);
        var infoparagraph = document.getElementById("infotext");
        console.log(`${information[radios[i].value]}`);
        console.log(infoparagraph);
        infoparagraph.innerHTML = information[`${radios[i].value}`];
        currentlySelectedAlgorithm = `${radios[i].value}`;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
  });

  //Responsive Design Code?

})();

//Set a cookie for delay.
//Also display the big-O efficieny chart
//Make the code less ugly

//Refactor this code after everything is done with better comments and modularity(OOP?)
//Move variables to top, initialize at bottom, functions in the middle, out of global scope, check for leaks, bug tesing