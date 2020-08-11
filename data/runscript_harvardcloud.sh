#!/bin/bash                 
#SBATCH -c 16               # Number of cores
#SBATCH -N 1                # Ensure that all cores are on one machine
#SBATCH -t 1-00:00          # Runtime in D-HH:MM, minimum of 10 minutes
#SBATCH -p shared           # Partition to submit to
#SBATCH --mem=64GB          # Memory pool for all cores (see also --mem-per-cpu)
#SBATCH -o myoutput_%j.out  # File to which STDOUT will be written, %j inserts jobid
#SBATCH -e myerrors_%j.err  # File to which STDERR will be written, %j inserts jobid

# Load modules 
module load node/6.10.1-fasrc01 

# Check install libraries
npm install

# Run program
srun -c 16 node analysis.js