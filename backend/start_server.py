#!/usr/bin/env python
"""
Development server startup script for the Django backend.
Run this to start the backend server.
"""
import os
import sys
import subprocess

def main():
    """Start the Django development server."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    
    try:
        # Run migrations first
        print("Running migrations...")
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        
        # Start the development server
        print("Starting Django development server...")
        subprocess.run([sys.executable, 'manage.py', 'runserver', '127.0.0.1:8000'], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)

if __name__ == '__main__':
    main()