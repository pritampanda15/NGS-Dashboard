#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)
filename <- args[1]
output_file <- args[2]

# Example processing with Seurat
library(Seurat)
library(SeuratObject)

data <- Read10X_h5(filename)
seurat_obj <- CreateSeuratObject(counts = data)
seurat_obj <- NormalizeData(seurat_obj)
#Seurat_object <- NormalizeData(seurat_object, normalization.method = "LogNormalize", scale.factor = 10000)

# Save the result
#saveRDS(seurat_obj, file = paste0("output/", filename, "_results.rds"))
saveRDS(seurat_obj, file = output_file)
