from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt

# Read the data from the file
data = pd.read_csv('data_post_merge.csv')
#data = pd.read_csv('test.txt')
#data = pd.read_csv('data_pre_merge.csv')

# Convert the 'time' column to datetime objects
data['time'] = pd.to_datetime(data['time'])

# Calculate the time differences
data['time_diff'] = data['time'].diff()

# Calculate the average time difference
average_time_diff = data['time_diff'].mean()

# Calculate the maximum time difference
max_time_diff = data['time_diff'].max()
min_time_diff = data['time_diff'].min()

data = data.dropna()

# Get unique time difference values and their counts
time_diff_values = data['time_diff'].dt.total_seconds()
unique_values, value_counts = time_diff_values.value_counts().index, time_diff_values.value_counts().values

total_count = len(time_diff_values)
percentage_values = (value_counts / total_count) * 100

for val, count, percentage in zip(unique_values, value_counts, percentage_values):
    print(f"Value: {val}, Count: {count}, Percentage: {percentage:.2f}%")

# Create a bar chart with unique time difference values on the x-axis
plt.figure(figsize=(7, 5))
plt.bar(unique_values, value_counts, log=True, width=6, color='#66b3ff')
plt.title('Block Time since Merge (Logarithmic Scale)')
plt.xlabel('Time Difference (seconds)')
plt.ylabel('Frequency (log-scale)')
plt.xticks(unique_values, rotation=0)
plt.tight_layout()

fixed_y_ticks = value_counts

# Set the y-axis ticks and labels
plt.yticks(fixed_y_ticks, [str(val) for val in fixed_y_ticks])

# Show the chart
plt.savefig('pos_block_time_bar_chart.png', bbox_inches='tight', dpi=300)
plt.close()

