paper=paper.pdf
paper_tex=paper.tex
deps = paper.tex block_time_analysis/*.png chapters/*.tex

all: $(paper)

$(paper): $(deps)
	GS_OPTIONS=-dPDFSETTINGS=/prepress rubber -f --pdf -Wrefs -Wmisc $(paper_tex)

figures: 
	cd block_time_analysis; source venv/bin/activate; python plot_post_merge.py
	cd block_time_analysis; source venv/bin/activate; python plot_pre_merge.py
 
clean:
	rubber --clean $(paper_tex)

