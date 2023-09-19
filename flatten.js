// Define the paths for input (raw) and output (expanded) directories
var rawDirPath = "C:/Users/MornéErasmus/Documents/Clients/fanblock/icons/raw";
var expandedDirPath = "C:/Users/MornéErasmus/Documents/Clients/fanblock/icons/expanded";

// Open the raw directory
var rawDir = new Folder(rawDirPath);
if (rawDir.exists) {
    var rawFiles = rawDir.getFiles("*.svg");
    
    // Create the expanded directory if it doesn't exist
    var expandedDir = new Folder(expandedDirPath);
    if (!expandedDir.exists) {
        expandedDir.create();
    }
    
    // Loop through the SVG files in the raw directory
    for (var i = 0; i < rawFiles.length; i++) {
        var rawFile = rawFiles[i];
        
        // Open the SVG file
        var doc = app.open(rawFile);
        
        // Select all objects in the document
        doc.selectObjectsOnActiveArtboard();

         // Perform the "Object > Expand" operation
        // app.executeMenuCommand("expandStyle");

        app.executeMenuCommand('Live Outline Object');
        app.executeMenuCommand('Live Outline Stroke');
        app.executeMenuCommand('expandStyle'); // Expand Appearance
        
        // // Flatten the selected objects
        // app.executeMenuCommand("Flatten");
        
        // Define the output file path in the expanded directory
        var expandedFilePath = expandedDirPath + "/" + rawFile.name;
        
        // Save the modified document as SVG
        doc.exportFile(new File(expandedFilePath), ExportType.SVG);
        
        // Close the document without saving changes to the original SVG file
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
    
    // Inform the user that the process is complete
    alert("Flattening and saving of SVG files is complete.");
} else {
    alert("The raw directory does not exist.");
}
