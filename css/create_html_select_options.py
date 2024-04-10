import os

def print_files_in_directory(directory):
    # Check if the provided directory exists
    if not os.path.exists(directory):
        print(f"The directory '{directory}' does not exist.")
        return
    
    # Iterate over all files in the directory
    for filename in sorted(os.listdir(directory)):
        # Check if the path is a file (not a directory)
        if os.path.isfile(os.path.join(directory, filename)) and filename[-3:] == "png":
            print(f"<option value=\"{filename[:-4]}\"> {filename[:-4].replace('_', ' ').capitalize()}</option>")


# Example usage:
directory_path = "/home/astegger-linux/Downloads/InventivetalentDev-minecraft-assets-1.20.4-0-g90d256d/InventivetalentDev-minecraft-assets-90d256d/assets/minecraft/textures/block"

print_files_in_directory(directory_path)
