from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Read the data from the file
data = pd.read_csv('data_pre_merge.csv')
#data = pd.read_csv('test.txt')

# Convert the 'time' column to datetime objects
data['time'] = pd.to_datetime(data['time'])

# Calculate the time differences and drop NaN values
data['time_diff'] = data['time'].diff().dropna()

# Convert time differences to seconds
data['time_diff_sec'] = data['time_diff'].dt.total_seconds()
#print("Time diff mean", data['time_diff'].mean())

# Define the bins for the time differences
bins = [0, 10, 20, 30]

# Use pd.cut to bin the time differences
data['time_diff_binned'] = pd.cut(data['time_diff_sec'], bins=bins, include_lowest=True, right=False)

# Count the occurrences in each bin
pie_chart_data = data['time_diff_binned'].value_counts(sort=False).sort_index()
#print(pie_chart_data)

# Calculate percentages
pie_chart_data_percentage = pie_chart_data / pie_chart_data.sum() * 100

labels = [f'{int(bin.left)}-{int(bin.right)}s ({percent:.2f}%)' for bin, percent in zip(pie_chart_data.index.categories, pie_chart_data_percentage)]

colors = ['#ff9999','#66b3ff', '#99ff99','#ffcc99']

# Create the pie chart
plt.figure(figsize=(7, 5))  # Increase the figure size
plt.pie(pie_chart_data, labels=labels, startangle=140, colors=colors)

# Add a circle at the center to turn the pie chart into a donut chart
centre_circle = plt.Circle((0,0),0.40,fc='white')
fig = plt.gcf()
fig.gca().add_artist(centre_circle)

# Equal aspect ratio ensures that pie is drawn as a circle.
plt.axis('equal')

# Add a title and improve its appearance
plt.title('Block Times under PoW (Year 2021)')

# Save the figure with a higher resolution
labels = [f'{bin} ({percent:.2f}%)' for bin, percent in zip(pie_chart_data, pie_chart_data_percentage)]
plt.legend(labels, loc="best")

plt.text(0, 0, 'Mean:\n {:.2f} seconds'.format(data['time_diff'].mean().total_seconds()), ha='center', va='center', fontsize=10)

plt.tight_layout()

plt.savefig('pow_block_time_pie_chart.png', dpi=300)

