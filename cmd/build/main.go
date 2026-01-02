package main

import (
	"encoding/json"
	"html/template"
	"log"
	"os"
	"strings"
	"path/filepath"
)

type Page struct {
	Slug string
	Content Content
}

type Content struct {
	Slug  string `json:"slug"`
	JobTitle  string `json:"jobTitle"`
	Summary string `json:"summary"`
	MoneycatchaSummary string `json:"moneycatchaSummary"`
	MoneycatchaBulletPoints []string `json:"moneycatchaBulletPoints"`
	VgwSummary string `json:"vgwSummary"`
	VgwBulletPoints []string `json:"vgwBulletPoints"`
}

func main() {
	contentFiles, err := os.ReadDir("content")
	if err != nil {
		log.Fatal(err)
	}

	var pages []Page

	for _, file := range contentFiles {
		filePath := filepath.Join("content", file.Name())
		data, err := os.ReadFile(filePath)
		if err != nil {
			log.Fatal(err)
		}
		var content Content
		if err := json.Unmarshal(data, &content); err != nil {
			log.Fatal(err)
		}
		slug := strings.TrimSuffix(file.Name(), ".json")
		pages = append(pages, Page {
			Slug: slug,
			Content: content,
		})
	}

	tmpl, err := template.ParseFiles(
		"templates/base.html",
	)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.MkdirAll("dist", 0755); err != nil {
		log.Fatal(err)
	}

	for _, page := range pages {
		outPath := filepath.Join("dist", page.Slug+".html")
		outFile, err := os.Create(outPath)
		if err != nil {
			log.Fatal(err)
		}

		if err := tmpl.Execute(outFile, page.Content); err != nil {
			log.Fatal(err)
		}

		outFile.Close()
		log.Println("generated", outPath)
	}
}

