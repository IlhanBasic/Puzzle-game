from typing import Tuple

class Heuristic:
    def get_evaluation(self, state: Tuple[int, ...]) -> int:
        raise NotImplementedError

class HammingDistance(Heuristic):
    def get_evaluation(self, state: Tuple[int, ...]) -> int:
        size = int(len(state) ** 0.5)
        goal_state = tuple(i % (size * size) for i in range(1, size * size + 1))
        return sum(1 for i, j in zip(state, goal_state) if i != j and i != 0)

class ManhattanDistance(Heuristic):
    def get_evaluation(self, state: Tuple[int, ...]) -> int:
        size = int(len(state) ** 0.5)
        total = 0
        
        for i, value in enumerate(state):
            if value != 0:
                goal_pos = (value - 1) if value != size * size else 0
                current_row, current_col = divmod(i, size)
                goal_row, goal_col = divmod(goal_pos, size)
                total += abs(current_row - goal_row) + abs(current_col - goal_col)
                
        return total