from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .algorithms import BFS, BestFirst, AStar
from .heuristics import HammingDistance, ManhattanDistance
from rest_framework.permissions import AllowAny 
# Algoritmi i heuristike za slagalicu
ALGORITHMS = {
    'bfs': BFS,
    'bestFirst': BestFirst,
    'aStar': AStar
}

HEURISTICS = {
    'hamming': HammingDistance,
    'manhattan': ManhattanDistance
}

def index(request):
    return JsonResponse({"message": "Welcome to the Puzzle API!"})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny]) 
def solve_puzzle(request):
    initial_state = tuple(request.data['initial_state'])
    algorithm_name = request.data['algorithm']
    heuristic_name = request.data['heuristic']
    
    algorithm_class = ALGORITHMS[algorithm_name]
    heuristic_class = HEURISTICS[heuristic_name]
    
    algorithm = algorithm_class(heuristic_class())
    solution_steps = algorithm.get_solution_steps(initial_state)
    
    return Response({'moves': solution_steps, 'nodes_evaluated': algorithm.nodes_evaluated, 'nodes_generated': algorithm.nodes_generated})

# **Nova funkcionalnost za korisnike**
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        print("Errors:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    """Primer zaštićene rute."""
    return Response({"message": "Access granted! This is a protected route."})
