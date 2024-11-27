
# Pyzzle - k-Puzzle Game Simulation

**Pyzzle** is a graphical simulation written in Python that demonstrates the operation of basic search algorithms on the k-Puzzle game problem. The game consists of a square matrix of tiles numbered from 1 to k, with one empty space marked as 0. The objective is to rearrange the tiles by sliding them horizontally or vertically into the empty space so that they form a matrix with the tiles in ascending order.

In this simulation, the tiles represent parts of an image that needs to be reconstructed. To solve this, several algorithms and heuristic functions are implemented.

## Features

-   **Algorithms:**
    
    -   Breadth-First Search (BFS)
    -   Best-First Search
    -   A* Algorithm
-   **Heuristics:**
    
    -   Hamming: Counts the number of tiles that are not in their correct target positions.
    -   Manhattan: Sums the Manhattan distances of each tile from its corresponding target position.
-   **Customizable Start State:**
    
    -   Load a scrambled image matrix to simulate the solution process.

## How to Use

The client-side of the application is written in JavaScript, and the server-side is developed using Django. The application can be hosted and run directly in a web browser.

Upon running the application, the following will occur:

1.  The chosen algorithm is executed.
2.  A window will display the scrambled matrix of image tiles.
3.  The current simulation step will be shown below the matrix.

### Controls:

-   **SPACE**: Start or temporarily pause the solution simulation.
-   **ENTER**: Show the final solution.
-   **ESC**: Stop the application and close the window.

## Algorithms and Heuristics

### Algorithms:

1.  **Breadth-First Search (BFS)**: Explores all possible moves level by level.
2.  **Best-First Search**: Sorts nodes by their heuristic value, and if there are multiple nodes with the same value, they are sorted by the node's identification tag.
3.  __A_ Algorithm_*: Similar to Best-First Search, but also takes into account the cost of the path, with ties broken by the identification tag of the last node.

### Heuristics:

-   **Hamming**: The number of tiles that are not in their correct target positions.
-   **Manhattan**: The sum of the Manhattan distances from each tile to its correct target position.

### Node Identification Tag:

A node's identification tag is a tuple of integers representing the tile labels obtained by linearizing the matrix row by row (top to bottom). For example, for the start state (8, 0, 6, 5, 4, 7, 2, 3, 1), the identification tag is (8, 0, 6, 5, 4, 7, 2, 3, 1), and for the target state (1, 2, 3, 4, 5, 6, 7, 8, 0), it is (1, 2, 3, 4, 5, 6, 7, 8, 0).

## Installation

1.  Clone the repository:
    
	   ```bash
	   git clone https://github.com/IlhanBasic/Pyzzle.git
       cd Pyzzle 
    
2.  Install dependencies:
    
    ```bash
    pip install -r requirements.txt 
    
3.  Run the application:
    
    ```bash
    python manage.py runserver 
4.  Open your web browser and navigate to
    ```bash
    http://localhost:8000
## Contribution

If you want to contribute to **Pyzzle**, feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
