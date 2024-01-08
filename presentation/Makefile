.PHONY: clean

input = README.md
output = presentation.pdf
default: $(output)

$(output): $(input)
	pandoc -t beamer README.md -o presentation.pdf --pdf-engine=xelatex

clean:
	\rm -rf presentation.pdf

