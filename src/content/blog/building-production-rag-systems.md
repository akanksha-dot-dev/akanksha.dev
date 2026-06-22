---
title: "Building Production RAG Systems: What Nobody Tells You"
description: "What I learned deploying RAG at enterprise scale at Samsung SDS — from chunking strategies to evaluation pipelines, and why 92% accuracy took months, not days."
date: 2026-06-22
tags: ["RAG", "Production AI", "LLMs", "Enterprise"]
featured: true
readTime: "10 min"
---

# Building Production RAG Systems: What Nobody Tells You

Every tutorial shows you how to build a RAG system in 50 lines of code. `load documents → chunk → embed → query`. Done, right?

**No.** That's where the real work *starts*.

I've spent the last 8 months at Samsung SDS building production RAG systems — Graph RAG for financial document processing, Agentic RAG chatbots serving 500+ daily queries, and productivity analyzers processing JIRA stories and Confluence docs. Here's what nobody tells you about making RAG actually work at enterprise scale.

---

## 1. Chunking Strategy Is Everything

The default `RecursiveCharacterTextSplitter` with 1000 tokens and 200 overlap? It works for demos. In production with financial annual reports, it destroyed table structures, split context across chunks, and made the retriever hallucinate relationships that didn't exist.

**What actually worked:**
- **GMFT (General Multi-Format Table)** extraction for tables before chunking
- **Partition PDF** for structure-aware document parsing
- **Semantic chunking** over token-based — sentences that belong together stay together
- **Metadata-enriched chunks** — each chunk carries its section title, page number, and document type

The lesson: spend 60% of your time on ingestion pipeline, not on the model.

## 2. Evaluation Is Non-Negotiable

You can't improve what you can't measure. We built a full evaluation harness using **RAGAS** (Retrieval Augmented Generation Assessment) before writing a single line of production code.

Metrics we track on every deployment:
- **Faithfulness** — Is the answer grounded in retrieved context?
- **Answer Relevancy** — Does the answer address the question?
- **Context Precision** — Are the top-K chunks actually relevant?
- **Context Recall** — Did we miss any relevant information?

Our Graph RAG system went from 71% to 92% accuracy over 3 months of iterative evaluation. Most of the gains came from fixing the *retriever*, not the *generator*.

## 3. Graph RAG Changed Everything

For our financial services use case, traditional vector-similarity RAG topped out at ~78% accuracy. Entities like "Q3 revenue" appeared in multiple documents with different values (different years, different subsidiaries).

**Graph RAG** solved this by:
- Building a knowledge graph from extracted entities and relationships
- Using graph traversal to establish context *between* documents
- Combining graph-based retrieval with vector similarity (hybrid approach)
- Maintaining temporal awareness — "Q3 2024 revenue" vs "Q3 2023 revenue"

The 40% improvement in document retrieval accuracy came specifically from the graph layer resolving entity ambiguity.

## 4. Token Optimization Is a Real Engineering Problem

When your RAG context window contains 10 pages of annual report tables, you hit context length limits fast. Our divide-and-conquer strategy:

1. **Map phase** — Send each chunk to the LLM independently with a focused question
2. **Reduce phase** — Combine intermediate answers into a final response
3. **Token budget allocation** — Reserve tokens for system prompt, user query, and response

This let us use Llama-2 (4K context) for tasks that seemed to require GPT-4 (128K context), cutting API costs by 80%.

## 5. Agentic RAG > Vanilla RAG

The biggest upgrade was making our RAG system *agentic*. Instead of a single retrieve-generate cycle:

```
User Query → Retrieve → Generate → Answer
```

We built:

```
User Query → Agent decides strategy → Multi-step retrieval → 
Self-evaluation → Re-retrieve if needed → Generate → 
Confidence check → Answer (or escalate)
```

Using **Google ADK**, our agent:
- Decides whether to search the vector DB, knowledge graph, or both
- Can reformulate queries that return low-relevance results
- Self-evaluates answer quality before responding
- Escalates to human review when confidence is below threshold

This is what took us from 85% to 92% accuracy — the last 7% came from the agent's ability to *recognize when it didn't know enough* and retry.

---

## The Bottom Line

Building a RAG demo takes hours. Building a production RAG system takes months. The difference is:

| Demo | Production |
|------|-----------|
| Load PDF, chunk, query | Structure-aware extraction, semantic chunking, metadata enrichment |
| "It works!" | RAGAS evaluation on 500+ test cases |
| Vector similarity | Graph RAG + hybrid retrieval |
| Single LLM call | Divide-and-conquer token optimization |
| Retrieve → Generate | Agentic multi-step with self-evaluation |

**I care about AI that ships, not just AI that demos.**

If you're building production RAG systems and want to discuss architecture, evaluation strategies, or agent patterns — [let's connect](https://linkedin.com/in/akankshadev).

---

*Akanksha is a Production AI Engineer at Samsung SDS, Gurugram, where she builds enterprise RAG systems, autonomous AI agents with Google ADK, and LLM infrastructure. Connect on [LinkedIn](https://linkedin.com/in/akankshadev) or [GitHub](https://github.com/akanksha-dot-dev).*
