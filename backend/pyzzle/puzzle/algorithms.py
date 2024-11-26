from typing import List, Tuple
from collections import deque
import heapq
from .heuristics import Heuristic

class Algorithm:
    def __init__(self, heuristic: Heuristic = None):
        self.heuristic = heuristic
        self.nodes_evaluated = 0
        self.nodes_generated = 0

    def get_legal_actions(self, state: Tuple[int, ...]) -> List[int]:
        self.nodes_evaluated += 1
        size = int(len(state) ** 0.5)
        zero_index = state.index(0)
        row, col = divmod(zero_index, size)
        actions = []
        
        # Up
        if row > 0:
            actions.append(zero_index - size)
        # Right
        if col < size - 1:
            actions.append(zero_index + 1)
        # Down
        if row < size - 1:
            actions.append(zero_index + size)
        # Left
        if col > 0:
            actions.append(zero_index - 1)
            
        return actions

    def apply_action(self, state: Tuple[int, ...], action: int) -> Tuple[int, ...]:
        self.nodes_generated += 1
        state_list = list(state)
        zero_index = state_list.index(0)
        state_list[zero_index], state_list[action] = state_list[action], state_list[zero_index]
        return tuple(state_list)

    def get_solution_steps(self, initial_state: Tuple[int, ...]) -> List[int]:
        size = int(len(initial_state) ** 0.5)
        goal_state = tuple(i % (size * size) for i in range(1, size * size + 1))
        return self.get_steps(initial_state, goal_state)

    def get_steps(self, initial_state: Tuple[int, ...], goal_state: Tuple[int, ...]) -> List[int]:
        raise NotImplementedError

class BFS(Algorithm):
    def get_steps(self, initial_state: Tuple[int, ...], goal_state: Tuple[int, ...]) -> List[int]:
        queue = deque([(initial_state, [])])
        visited = {initial_state}
        
        while queue:
            state, path = queue.popleft()
            if state == goal_state:
                return path
                
            for action in self.get_legal_actions(state):
                next_state = self.apply_action(state, action)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append((next_state, path + [action]))
        
        return []

class BestFirst(Algorithm):
    def get_steps(self, initial_state: Tuple[int, ...], goal_state: Tuple[int, ...]) -> List[int]:
        heap = [(self.heuristic.get_evaluation(initial_state), 0, initial_state, [])]
        visited = {initial_state}
        counter = 1
        
        while heap:
            _, _, state, path = heapq.heappop(heap)
            if state == goal_state:
                return path
                
            for action in self.get_legal_actions(state):
                next_state = self.apply_action(state, action)
                if next_state not in visited:
                    visited.add(next_state)
                    h = self.heuristic.get_evaluation(next_state)
                    heapq.heappush(heap, (h, counter, next_state, path + [action]))
                    counter += 1
        
        return []

class AStar(Algorithm):
    def get_steps(self, initial_state: Tuple[int, ...], goal_state: Tuple[int, ...]) -> List[int]:
        heap = [(self.heuristic.get_evaluation(initial_state), 0, initial_state, [])]
        visited = {initial_state: 0}
        counter = 1
        
        while heap:
            _, g, state, path = heapq.heappop(heap)
            if state == goal_state:
                return path
                
            for action in self.get_legal_actions(state):
                next_state = self.apply_action(state, action)
                next_g = g + 1
                
                if next_state not in visited or next_g < visited[next_state]:
                    visited[next_state] = next_g
                    h = self.heuristic.get_evaluation(next_state)
                    f = next_g + h
                    heapq.heappush(heap, (f, next_g, next_state, path + [action]))
                    counter += 1
        
        return []