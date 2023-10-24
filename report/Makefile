PAPER=paper.tex
FIGURES=$(wildcard figures/*.pdf)
DOCUMENTS=$(wildcard *.tex)

all: pdf

pdf: $(DOCUMENTS) $(FIGURES)
	GS_OPTIONS=-dPDFSETTINGS=/prepress rubber -f --pdf -Wrefs -Wmisc $(PAPER)

figure: $(DOCUMENTS) $(FIGURES)
	pdflatex -shell-escape $(PAPER)

clean:
	rubber --clean $(PAPER)

