(function () {

  function MasterSortingFunction() {
    let array = [];

    this.insert = function (item) {
      array.push(item);
    };

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
  }

  //Bogo Sort

  //Merge Sort
  this.mergerSort = function () {
    array = mergeSortRec(array);
  };

  var mergeSortRec = function (array) {
    var length = array.length;
    if (length == 1) {
      return array;
    }
    var mid = Math.floor(length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  var merge = function (left, right) {
    //more recursion
  }

  //Quick Sort

  //Set up in a prototype hierarchy hierarchy

  //Canvas Visualization, using sorting code to sort color circle
  //https://codepen.io/Yonkai/pen/gdOzYz?editors=0010
})();