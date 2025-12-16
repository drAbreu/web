This morning, we got an e-mail from a colleague using one of our AI models intro production that was really interesting.

She is using our embedding model to compare how similar are two different texts, in order to use that information for downstream tasks.
The model she is using is basically a sentence transformers model that has been fine-tuned, using ModernBERT as pretrained weights, using the abstract of the entire PubMed, which contains most of the world knowledges in biomedical sciences.

She was unabe to find a similar paper (abstract) and she passed us an abstract that she would consider as very similar to the original.

After hearing that, we run an analysis and found the following results:

Minilm: 0.68
Negsam_mod: 0.49
Negsam_pmb: 0.58
Vicreg_exact: 0.83
Vicreg_contrast: 0.44
Vicreg_our: 0.87

The interesting thing here is that 4 of these models are trained with negative sampling, while other two are sentence transformers models trained without negative sampling. At the light of the results, you can see where I am coming.
The two models without negative sampling training do perform much better. And on top of that, the fine-tuned negative sampling models, all of them, perform worse than the minilm model, which is not fine tuned in PubMed.

This is a very interesting result that spark our curiosity. We must say, this is, as of now, an anomaly. We haven't yet find this behavior as often as to understand it as a real threat to negative sampling trained embeddings. HOwever, it is a very interesting result that deserves to be studied on its own.

Questions to ask:

- Why negative sampling is worse? Might be overfitting on some obscure way?
- Why vicreg works better? Is really the pure semantic knowledge?
- Would a selective layer negative sampling model work better? 
